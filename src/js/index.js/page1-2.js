{
    let view = {
        el: 'section.songs',
        init(){
            this.$el=$(this.el)
        },
        render(data){
            console.log(1)
            let {songs} = data
            console.log({songs})

            songs.map((song)=>{
                console.log(2)
                let $li = $(`
                <li>
                    <h3>${song.name}</h3>
                    <p>
                        <svg class="icon icon-sq">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-sq"></use>
                        </svg>
                        ${song.singer}
                    </p>
                    <a class="playButton" href="./song.html?id={{song.id}}">
                        <svg class="icon icon-play">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-play"></use>
                        </svg>
                    </a>
                </li>
                `)
                console.log($li)
                this.$el.find('ol.list').append($li)
            })
           
        }
    }
    let model ={
        data: {
            songs: []
        },
        find(){
            var query = new AV.Query('Song');
            return query.find().then((songs)=> {//返回一个promise对象 才能接then()函数
                   this.data.songs = songs.map((song)=> {
                    return {id: song.id, ...song.attributes}
                  })
                   return songs//返回一个promise对象 才能接then()函数
            })                 //这是一个promise链
        }//获取歌曲
    }
    let controller={
        init(view,model){
            this.view = view
            this.view.init()
            this.model=model
            this.model.find().then(()=>{
                console.log(this.model.data)
                this.view.render(this.model.data)
            })
        }
    }
    controller.init(view,model)
}