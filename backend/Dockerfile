FROM python:3.11.3-slim-buster

LABEL MAINTAINER="Tuan-Anh Nguyen <21anh.nt@vinuni.edu.vn>"

WORKDIR /var/www/

ADD . /var/www/

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]