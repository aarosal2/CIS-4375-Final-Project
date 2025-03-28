#import flask libraries
#code from class template
import flask
from flask import jsonify
from flask import request

from creds import Creds

from sql import create_con
from sql import execute_read_query
from sql import execute_query

#create flask application
app = flask.Flask(__name__)
app.config["DEBUG"] = True

#login route


#etc crud