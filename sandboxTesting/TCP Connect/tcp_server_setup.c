#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <netinet/in.h>
#include <signal.h>
#include <string.h>
#include <netinet/in.h>
#include <arpa/inet.h>

/* Manifest constants */
#define MAX_BUFFER_SIZE 40

/* Global manifest constants */
#define MAX_MESSAGE_LENGTH 100
#define MYPORTNUM 1234
#define OPTION_SIZE 6
/* IP address of Pi */
#define SERVER_IP "192.168.0.100"

/* Optional verbose debugging output */
#define DEBUG 1

/* Global variable */
int childsockfd;

/* This is a signal handler to do graceful exit if needed */
void catcher( int sig )
{
        close(childsockfd);
        exit(0);
}

/* Main program for server */
int main()
{
        struct sockaddr_in server;
        static struct sigaction act;
        char messagein[MAX_MESSAGE_LENGTH];
        char messageout[MAX_MESSAGE_LENGTH];
        char sentence[MAX_MESSAGE_LENGTH];
        int parentsockfd;
        int i, j;
        int pid;
        char c;

        struct sockaddr_in si_server;
        struct sockaddr *server_udp;
        int s, i2, len = sizeof(si_server);
        char buf[MAX_BUFFER_SIZE];
        int readBytes;

        /* Set up a signal handler to catch some weird termination conditions. */
        act.sa_handler = catcher;
        sigfillset(&(act.sa_mask));
        sigaction(SIGPIPE, &act, NULL);

        /* Initialize server sockaddr structure */
        memset(&server, 0, sizeof(server));
        server.sin_family = AF_INET;
        server.sin_port = htons(MYPORTNUM);
        server.sin_addr.s_addr = htonl(INADDR_ANY);

        /* set up the transport-level end point to use TCP */
        if( (parentsockfd = socket(PF_INET, SOCK_STREAM, 0)) == -1 )
        {
                fprintf(stderr, "server: socket() call failed!\n");
                exit(1);
        }

        /* bind a specific address and port to the end point */
        if( bind(parentsockfd, (struct sockaddr *)&server, sizeof(struct sockaddr_in) ) == -1 )
        {
                fprintf(stderr, "server: bind() call failed!\n");
                exit(1);
        }

        /* start listening for incoming connections from clients */
        if( listen(parentsockfd, 5) == -1 )
        {
                fprintf(stderr, "server: listen() call failed!\n");
                exit(1);
        }

        /* initialize message strings just to be safe (null-terminated) */
        bzero(messagein, MAX_MESSAGE_LENGTH);
        bzero(messageout, MAX_MESSAGE_LENGTH);

        fprintf(stderr, "Welcome! This is a test echo server!!\n");
        fprintf(stderr, "server listening on TCP port %d...\n\n", MYPORTNUM);

        /* Main loop: server loops forever listening for requests */
        for( ; ; )
        {
                /* accept a connection */
                if( (childsockfd = accept(parentsockfd, NULL, NULL)) == -1 )
                {
                        fprintf(stderr, "server: accept() call failed!\n");
                        exit(1);
                }

                /* try to create a child process to deal with this new client */
                pid = fork();

                if( pid < 0 )
                {
                        fprintf(stderr, "server: fork() call failed!\n");
                        exit(1);
                }
                else if( pid == 0 )
                {
                        close(parentsockfd);
                        /* obtain the message from this client */
                        while( recv(childsockfd, messagein, MAX_MESSAGE_LENGTH, 0) > 0 )
                        {
                                printf("Child process received word: %s\n", messagein);
                                /* echo message back to client */
                                send(childsockfd, messagein, strlen(messagein), 0);

                                bzero(messagein, MAX_MESSAGE_LENGTH);
                        }

                        close(childsockfd);
                        exit(0);
                }
                else
                {
                        fprintf(stderr, "Created child process %d to handle client\n", pid);
                        fprintf(stderr, "Parent returning to listening...\n\n");

                        close(childsockfd);
                }
        }
}
