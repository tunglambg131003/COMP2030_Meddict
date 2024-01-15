FROM python:3.11.3-slim-buster

LABEL MAINTAINER="Tuan-Anh Nguyen <21anh.nt@vinuni.edu.vn>"

WORKDIR /var/www/

ADD ./requirements.txt /var/www/

# RUN pip install --upgrade pip
RUN --mount=type=cache,target=/root/.cache/pip pip install -r requirements.txt

ADD . /var/www/

EXPOSE 5000

CMD ["uvicorn", "resources.app:app", "--host", "0.0.0.0", "--port", "5000"]