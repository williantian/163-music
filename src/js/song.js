 {
     let view ={
         el: '#app',
         template: `
          <audio src={{url}}></audio>
          <div>
             <button class="play">播放</button>
             <button class="pause">暂停</button>
          </div>   
         `,
         render(data){
             $(this.el).html(this.template.replace('{{url}}', data.url))
             console.log($('audio')[0])
         },
         play(){
            let audio =  $(this.el).find('audio')[0]
            audio.play()
         },
         pause(){
            let audio =  $(this.el).find('audio')[0]
            audio.pause()
         }
     }
     let model={
         data: {
            id: '',
            name: '',
            singer: '',
            url: ''
         },
         getId(id){
            var query = new AV.Query('Song');
            return query.get(id).then((song)=> {
                Object.assign(this.data,{id: song.id,...song.attributes})
                return song
              
            })
         }
     }
     let controller ={
         init(view,model){
             this.view = view
             this.model=model
             let id = this.getSongId()
             this.model.getId(id).then(()=>{
                 this.view.render(this.model.data)
             })
             this.bindEvents()
         },
         getSongId(){
            let search = window.location.search
            if(search.indexOf('?')===0){
                search = search.substring(1)
            }
          
          
            let array = search.split('&').filter((v=>v))
            let id = ''
            for(let i=0; i<array.length; i++){
                let keyValue = array[i].split('=')
                let key = keyValue[0]
                let value = keyValue[1]
                if(key === 'id'){
                    id = value
                    break
                }
            }//从查询参数中找到id 及其对应的值
            return id
         },
         bindEvents(){
             $(this.view.el).on('click','.play',()=>{
                 this.view.play()
             })
             $(this.view.el).on('click','.pause',()=>{
                this.view.pause()
            })
         }
     }
     controller.init(view,model)
 }
 
 