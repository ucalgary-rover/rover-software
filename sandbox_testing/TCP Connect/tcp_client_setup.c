#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <netdb.h>
#include <string.h>

/* Some generic error handling stuff */
extern int errno;
void perror(const char *s);

/* Manifest constants used by client program */
#define MAX_HOSTNAME_LENGTH 64
#define MAX_WORD_LENGTH 100
#define BYNAME 1
#define MYPORTNUM 1234   /* must match the server's port! */
/* IP address of Pi */
#define SERVER_IP "192.168.0.100"

/* Menu selections */
#define ALLDONE 0
#define ENTER 1

/* Main program of client */
int main()
{
        int sockfd, sockfd2;
        char c;
        struct sockaddr_in server;
        struct hostent *hp;
        char hostname[MAX_HOSTNAME_LENGTH];
        char message[MAX_WORD_LENGTH];
        char messageback[MAX_WORD_LENGTH];
        char temp[MAX_WORD_LENGTH];
        int choice, len, bytes;

        /* Initialization of server sockaddr data structure */
        memset(&server, 0, sizeof(server));
        server.sin_family = AF_INET;
        server.sin_port = htons(MYPORTNUM);
        server.sin_addr.s_addr = htonl(INADDR_ANY);

#ifdef BYNAME
        strcpy(hostname, SERVER_IP);
        hp = gethostbyname(hostname);
        if (hp == NULL)
        {
                fprintf(stderr, "%s: unknown host\n", hostname);
                exit(1);
        }
        /* copy the IP address into the sockaddr structure */
        bcopy(hp->h_addr, &server.sin_addr, hp->h_length);
#else
        /* hard code the IP address so you don't need hostname resolver */
        server.sin_addr.s_addr = inet_addr(SERVER_IP);
#endif

        /* create the client socket for its transport-level end point */
        if( (sockfd = socket(PF_INET, SOCK_STREAM, 0)) == -1 )
        {
                fprintf(stderr, "client: socket() call failed!\n");
                exit(1);
        }

        /* connect the socket to the server's address using TCP */
        if( connect(sockfd, (struct sockaddr *)&server, sizeof(struct sockaddr_in)) == -1 )
        {
                fprintf(stderr, "client: connect() call failed!\n");
                perror(NULL);
                exit(1);
        }

        /* Print welcome banner */
        printf("This is a test echo client.\n");

        do{
          printf("Send: ");
          len = 0;
          while( (c = getchar()) != '\n' )
          {
                  message[len] = c;
                  len++;
          }
          /* make sure the message is null-terminated in C */
          message[len] = '\0';

          /* send it to the server via the socket */
          send(sockfd, message, strlen(message), 0);

          if( (bytes = recv(sockfd, messageback, len, 0)) > 0 )
          {
                  /* make sure the message is null-terminated in C */
                  messageback[bytes] = '\0';
                  printf("Answer received from server: ");
                  printf("`%s'\n", messageback);
          }
          else
          {
                  /* an error condition if the server dies unexpectedly */
                  printf("Sorry, dude. Server failed!\n");
                  close(sockfd);
                  exit(1);
          }
        }while(strlen(message) > 0);
        /* Program all done, so clean up and exit the client */
        close(sockfd);
        exit(0);
}
