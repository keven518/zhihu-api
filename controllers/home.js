class HomeCtl {
  index(ctx) {
    ctx.body = '<h1>这是主页 - HomeCtl - 88';
  }

  async indexRender (ctx, next) {
    await ctx.render('index', {
      title: 'Hello Koa 2!'
    })
  }
}

module.exports = new HomeCtl();