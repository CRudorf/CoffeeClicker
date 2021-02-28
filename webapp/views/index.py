from flask import Blueprint, render_template

bp = Blueprint('index', __name__)


@bp.route('/')
def index():
    render_template('index.html')
