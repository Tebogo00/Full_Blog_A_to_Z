const { PHASE_DEVELOPMENT_SERVER }= require('next/constants')

// exports a javaScript object with Node.js export syntax
module.exports =(phase)=> {
  if (phase ===PHASE_DEVELOPMENT_SERVER){
  return{
  env: {
    mongodb_username: "maserolemojela",
    mongodb_password: "1707Kobue1",
    mongodb_clustername: "cluster0",
    mongodb_database: "my-blog-dev",
    },
  };
}

  return{
  env: {
    mongodb_username: "maserolemojela",
    mongodb_password: "1707Kobue1",
    mongodb_clustername: "cluster0",
    mongodb_database: "my-blog",
  },
};
};