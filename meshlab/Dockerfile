FROM python:3

WORKDIR /usr/src/app

RUN apt update && \
    apt install -y libgl1-mesa-glx

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
RUN mkdir -p tmp/uploads/template/
RUN mkdir -p tmp/uploads/file/

COPY . .

EXPOSE 5000

CMD [ "python", "-u", "./api.py" ]
