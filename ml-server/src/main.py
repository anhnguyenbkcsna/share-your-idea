# Python 3 server example
from http.server import CGIHTTPRequestHandler, HTTPServer
import cgi
from server import MyServer

hostName = "localhost"
serverPort = 8080

if __name__ == "__main__":        
  webServer = HTTPServer((hostName, serverPort), MyServer)
  print("Server started http://%s:%s" % (hostName, serverPort))  #Server starts
  try:
    webServer.serve_forever()
  except KeyboardInterrupt:
    pass

  webServer.server_close()  #Executes when you hit a keyboard interrupt, closing the server
  print("Server stopped.")