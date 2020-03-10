<template>
<v-card outlined class="ma-2">
  <v-container fill-height class="overflow-y-auto">
      <v-file-input prepend-icon="attach_file" accept=".apk" v-model="file" show-size label="File input"></v-file-input>
  </v-container>
</v-card>
</template>
<script>
export default {
  data(){
    return {
      file:null,
      test:null
    }
  },
  methods:{
    save(e){
      this.test = e.target.result
      let fs = require('fs')
      fs.writeFile('result.apk',e.target.result,"binary",(err)=>{
        window.console.log(err)
      })
    },
  },
  watch:{
    file(f){
      let reader = new FileReader()
      reader.onload = this.save
      reader.readAsBinaryString(f)
    }
  },
  created(){
    const http = require('http')
    http.createServer((req, res) => {
      if(req.method == 'GET' && req.url.includes("/test.apk")){
        var filename = "./result.apk"
        let fs = require('fs')
        var raw = fs.createReadStream( filename );

        res.writeHead(200,{'Content-type':"application/vnd.android.package-archive"})
        raw.pipe(res)
      } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World\n');
      }
    }).listen(3000, () => window.console.log('Server http://localhost:3000'));
  }
}
</script>