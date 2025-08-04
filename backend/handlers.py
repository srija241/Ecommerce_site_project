import tornado.web
import json
import pymysql
from config import DB_CONFIG

class BaseHandler(tornado.web.RequestHandler):
    def initialize(self):
        self.conn = pymysql.connect(**DB_CONFIG)
        self.cursor = self.conn.cursor(pymysql.cursors.DictCursor)

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "Content-Type")
        self.set_header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')

    def options(self, *args):
        # Handle preflight requests
        self.set_status(204)
        self.finish()

    def on_finish(self):
        self.cursor.close()
        self.conn.close()


class ProductsHandler(BaseHandler):
    def get(self):
        self.cursor.execute("SELECT * FROM products;")
        products = self.cursor.fetchall()

        # Convert Decimal to float for JSON serialization
        for product in products:
            product['price'] = float(product['price'])

        self.write({'products': products})
    def post(self):
        data = json.loads(self.request.body)
        query = "INSERT INTO products (name, description, price) VALUES (%s, %s, %s);"
        self.cursor.execute(query, (data['name'], data['description'], data['price']))
        self.conn.commit()
        self.set_status(201)
        self.write({'message': 'Product created'})

class ProductHandler(BaseHandler):
    def get(self, product_id):
        self.cursor.execute("SELECT * FROM products WHERE id = %s;", (product_id,))
        product = self.cursor.fetchone()

        if product:
            product['price'] = float(product['price'])  # Convert Decimal to float
            self.write(product)
        else:
            self.set_status(404)
            self.write({'error': 'Product not found'})

    def delete(self, product_id):
        self.cursor.execute("DELETE FROM products WHERE id = %s;", (product_id,))
        self.conn.commit()
        self.write({'message': 'Product deleted'})
