FROM      node:8.11.3-alpine
EXPOSE    80

CMD       ["yarn", "run", "start"]

ENV       APP_HOME /4k

# Install Modules
WORKDIR   $APP_HOME
COPY      package.json yarn.lock $APP_HOME
RUN       NODE_ENV=development yarn install

# Copy in files:
COPY      . $APP_HOME

# Options
ARG       GIT_COMMIT=
ARG       GIT_BRANCH=
ENV       GIT_COMMIT $GIT_COMMIT
ENV       GIT_BRANCH $GIT_BRANCH
