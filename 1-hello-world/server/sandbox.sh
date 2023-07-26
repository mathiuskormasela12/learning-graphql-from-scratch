
# This one is used to get greeting string in sandbox
query {
  # this one is a field was defined at our schema in server, if we type another field that isn't had in our schema, graphql will return an error message
  greeting
}

# We can type this instead as well
# We can query to graphql without type query
# because when we don't type query, graphql will type it automatically
# because it's default setting
# So if we don't type the query, it will set to query automatically
{
  greeting
}