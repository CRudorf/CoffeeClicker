"""
The application factory for this project.
When new blueprints are created, they must be registered with the application inside create_app.

This module should maintain the sole purpose of housing the create_app
function and some basic support functions. Routes don't go here; they go in blueprints.

Larger projects may have multiple application modules, such as cronapp.py or apiapp.py,
but app.py should always contain the factory for the "primary" end-user facing
website application.
"""
from typing import Iterable, Union
from pathlib import Path

from flask import current_app, Flask, g, request, session

from . import views

REPO_ROOT = Path(__file__).parent.parent


def create_app(config_paths: Iterable[Union[str, Path]] = None, **config_overrides) -> Flask:
    config_paths = config_paths or []
    app = Flask(__name__, root_path=REPO_ROOT)
    for i, absolute_path in enumerate(config_paths):
        print('{} config from {}'.format('Loading' if i == 0 else 'Extending', absolute_path))
        app.config.from_pyfile(absolute_path)
    for key, val in config_overrides.items():
        app.config[key] = val

    # TODO: Initialize database
    # Initialize Database

    # TODO: Add filters if needed
    # Filters

    # View blueprints
    app.register_blueprint(views.index.bp)

    return app
