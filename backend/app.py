import tornado.ioloop
import tornado.web
from handlers import ProductsHandler, ProductHandler

def make_app():
    return tornado.web.Application([
        (r"/products", ProductsHandler),
        (r"/products/([0-9]+)", ProductHandler),
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(8000)
    print("Backend running at http://localhost:8000")
    tornado.ioloop.IOLoop.current().start()
