from app import application
from werkzeug.middleware.proxy_fix import ProxyFix

application.wsgi_app = ProxyFix(
	application.wsgi_app, x_for = 1, x_proto = 1, x_host = 1, x_port = 1 
)

if __name__ == "__main__":
	application.run() 