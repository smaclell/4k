FROM      node:8.11.3-alpine
EXPOSE    8888

CMD       ["yarn", "run -p 8888:888", "start"]

ENV       APP_HOME=/4k NODE_ENV=production

# Install Modules
WORKDIR   $APP_HOME
COPY      package.json yarn.lock $APP_HOME/
RUN       yarn install

# Copy in files:
COPY      . $APP_HOME

# Options
ARG       GIT_COMMIT=
ARG       GIT_BRANCH=
ENV       GIT_COMMIT=$GIT_COMMIT GIT_BRANCH=$GIT_BRANCH
