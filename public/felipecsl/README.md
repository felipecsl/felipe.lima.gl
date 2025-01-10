# My personal blog

## Running locally

```
docker build -t felipe.lima.gl .
docker run -it -p 4000:4000 --rm --volume="$PWD:/usr/src/app" felipe.lima.gl
```

## Deploying

Simply push the updated website to master and Github
pages will take care of the rest.
