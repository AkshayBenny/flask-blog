# Fask-Nextjs advanced blog application

### Requirements

-   Python 3.9 or higher
-   Node.js v18 or higher
-   Docker (optional but recommended for containerization)
-   pnpm package manager

### Virtualenv setup

-   `cd` into the server directory
-   Install virtualenv. Refer https://mothergeo-py.readthedocs.io/en/latest/development/how-to/venv-win.html.
-   Create a new virtual environment using `python -m venv venv`
-   Activate the virtual environment:
    _ On macOS and Linux: `source ./venv/bin/activate`
    _ On Windows: `.\venv\Scripts\activate`

### Server setup

-   Ensure you are in the `server/` directory where `requirements.txt` is located.
-   Install the required Python libraries: `pip3 install -r requirements.txt`
-   Run the flask application using `python app.py`

### Server setup using Docker

-   Install Docker if you haven't already. For instructions, visit Docker's official website (https://docs.docker.com/).
-   Navigate to the `server/` directory containing the `Dockerfile`.
-   Build the Docker image: `docker build -t my-flask-server .`
-   Run the Docker container: `docker run -p 5000:5000 my-flask-server`

### Client setup

-   First install pnpm package manager. Refer https://pnpm.io/installation.
-   `cd` into `client/` directory.
-   Run `pnpm install`. This will install the dependencies.
-   Then run `pnpm run dev`. This will run the Nextjs project in port 3000.
