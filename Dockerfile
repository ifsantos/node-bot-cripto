FROM node:17

WORKDIR /node/src

RUN apt update && apt install build-essential -y

CMD ["tail", "-f", "/dev/null"]
