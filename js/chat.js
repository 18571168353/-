$(function () {
  // 初始化右侧滚动条
  // 这个方法定义在scroll.js中
  resetui()
  $('#btnSend').on('click', function () {
    var text = $('#ipt').val().trim()
    if (text.length == 0) {
      return $('#ipt').val('')
    }
    $('#talk_list').append(`
        <li class="right_word">
            <img src="img/person02.png" /> <span>${text}</span>
          </li>
        `)
    $('#ipt').val('')
    resetui()
    getMsg(text)
  })
  // 获取聊天机器人发送回来的消息
  
  function getMsg(text) {
    $.ajax({
      method: 'GET',
      url: 'http://www.liulongbin.top:3006/api/robot',
      data: {
        spoken: text
      },
      success: function (res) {
        if (res.message !== 'success') return alert('请求数据失败')

        var msg = res.data.info.text
        $('#talk_list').append(`
                    <li class="left_word">
                    <img src="img/person01.png" /> <span>${msg}</span>
                  </li>
                    `)
        resetui()
        getVoice(msg)
      }
    })
  }

  // 将文字转换成语音播放
  function getVoice(text){
    $.ajax({
      method:'GET',
      url:'http://www.liulongbin.top:3006/api/synthesize',
      data:{
        text:text
      },
      success:function(res){
        if(res.status===200){
          $('#voice').attr('src',res.voiceUrl)
        }
      }
    })
  }
  // 为文本框绑定keyup事件
  $('#ipt').on('keyup',function(e){
    if(e.keyCode===13){
      $('#btnSend').click()
    }
  })
})
