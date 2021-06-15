#include <ros/ros.h>

#include <rover/SignalStatus.h>
#include <libssh/libssh.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>

int verify_knownhost(ssh_session session);
int get_signal_strength(ssh_session session, ros::Publisher pub);

int main(int argc, char **argv)
{
	ros::init(argc, argv, "signal_strength_service");
	ros::NodeHandle nh;

	ros::Publisher pub = nh.advertise<rover::SignalStatus>(
		"rover/signal_report", 1000);

	ros::Rate rate(1);

	const char* host = "ubnt@192.168.1.30";
	int verbosity = SSH_LOG_PROTOCOL;
	int port = 22;

	int rc;
	char* password;

	ssh_session stationSession = ssh_new();
	if(stationSession == NULL)
	{
		exit(-1);
	}

	ssh_options_set(stationSession, SSH_OPTIONS_HOST, host);
	ssh_options_set(stationSession, SSH_OPTIONS_LOG_VERBOSITY, &verbosity);
	ssh_options_set(stationSession, SSH_OPTIONS_PORT, &port);

	rc = ssh_connect(stationSession);

	if(rc != SSH_OK)
	{
		fprintf(stderr, "Failed to connect to sector antenna - %s", ssh_get_error(stationSession));
		exit(-1);
	}

	// Verify the server's identity
	// For the source code of verify_knowhost(), check previous example
	if (verify_knownhost(stationSession) < 0)
	{
		ssh_disconnect(stationSession);
		ssh_free(stationSession);
		exit(-1);
	}

	// Authenticate ourselves
	password = "ssrt";
	rc = ssh_userauth_password(stationSession, NULL, password);
	if (rc != SSH_AUTH_SUCCESS)
	{
		fprintf(stderr, "Error authenticating with password: %s\n",
		ssh_get_error(stationSession));
		ssh_disconnect(stationSession);
		ssh_free(stationSession);
		exit(-1);
	}

	while(ros::ok())
	{
		get_signal_strength(stationSession, pub);
		rate.sleep();
	}

	ssh_disconnect(stationSession);
	ssh_free(stationSession);
}

int get_signal_strength(ssh_session session, ros::Publisher pub)
{
  rover::SignalStatus msg;

  ssh_channel channel;
  int rc;
  char buffer[256];
  int nbytes;
  std::string wirelessStatus;
  size_t valueCursor = std::string::npos;

  channel = ssh_channel_new(session);
  if (channel == NULL)
    return SSH_ERROR;

  rc = ssh_channel_open_session(channel);
  if (rc != SSH_OK)
  {
    ssh_channel_free(channel);
    return rc;
  }

  rc = ssh_channel_request_exec(channel, "iwconfig");
  if (rc != SSH_OK)
  {
    ssh_channel_close(channel);
    ssh_channel_free(channel);
    return rc;
  }

  nbytes = ssh_channel_read(channel, buffer, sizeof(buffer), 0);
  while (nbytes > 0)
  {
  	wirelessStatus.append(buffer);
    nbytes = ssh_channel_read(channel, buffer, sizeof(buffer), 0);
  }

  valueCursor = wirelessStatus.find("Bit Rate:");
  if(valueCursor != std::string::npos)
  {
  	msg.bit_rate = wirelessStatus.substr(valueCursor + 9, 8);
  }

  valueCursor = wirelessStatus.find("Link Quality=");
  if(valueCursor != std::string::npos)
  {
  	msg.link_quality = wirelessStatus.substr(valueCursor + 13, 5);
  }

  valueCursor = wirelessStatus.find("Signal level=");
  if(valueCursor != std::string::npos)
  {
  	msg.signal = wirelessStatus.substr(valueCursor + 13, 7);
  }

  valueCursor = wirelessStatus.find("Noise level=");
  if(valueCursor != std::string::npos)
  {
  	msg.noise = wirelessStatus.substr(valueCursor + 12, 7);
  }

  if (nbytes < 0)
  {
    ssh_channel_close(channel);
    ssh_channel_free(channel);
    return SSH_ERROR;
  }

  ssh_channel_send_eof(channel);
  ssh_channel_close(channel);
  ssh_channel_free(channel);

  pub.publish(msg);

  return SSH_OK;
}

int verify_knownhost(ssh_session session)
{
  int state, hlen;
  unsigned char *hash = NULL;
  char *hexa;
  char buf[10];

  state = ssh_is_server_known(session);

  hlen = ssh_get_pubkey_hash(session, &hash);
  if (hlen < 0)
    return -1;

  switch (state)
  {
    case SSH_SERVER_KNOWN_OK:
      break; /* ok */

    case SSH_SERVER_KNOWN_CHANGED:
      fprintf(stderr, "Host key for server changed: it is now:\n");
      ssh_print_hexa("Public key hash", hash, hlen);
      fprintf(stderr, "For security reasons, connection will be stopped\n");
      free(hash);
      return -1;

    case SSH_SERVER_FOUND_OTHER:
      fprintf(stderr, "The host key for this server was not found but an other"
        "type of key exists.\n");
      fprintf(stderr, "An attacker might change the default server key to"
        "confuse your client into thinking the key does not exist\n");
      free(hash);
      return -1;

    case SSH_SERVER_FILE_NOT_FOUND:
      fprintf(stderr, "Could not find known host file.\n");
      fprintf(stderr, "If you accept the host key here, the file will be"
       "automatically created.\n");
      /* fallback to SSH_SERVER_NOT_KNOWN behavior */

    case SSH_SERVER_NOT_KNOWN:
      hexa = ssh_get_hexa(hash, hlen);
      fprintf(stderr,"The server is unknown. Do you trust the host key?\n");
      fprintf(stderr, "Public key hash: %s\n", hexa);
      free(hexa);
      if (fgets(buf, sizeof(buf), stdin) == NULL)
      {
        free(hash);
        return -1;
      }
      if (strncasecmp(buf, "yes", 3) != 0)
      {
        free(hash);
        return -1;
      }
      if (ssh_write_knownhost(session) < 0)
      {
        fprintf(stderr, "Error %s\n", strerror(errno));
        free(hash);
        return -1;
      }
      break;

    case SSH_SERVER_ERROR:
      fprintf(stderr, "Error %s", ssh_get_error(session));
      free(hash);
      return -1;
  }

  free(hash);
  return 0;
}