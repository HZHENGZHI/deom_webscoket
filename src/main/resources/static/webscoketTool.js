var stompClient = null;
// 设置 WebSocket 进入端点
var SOCKET_ENDPOINT = "/mydlq";
// 设置订阅消息的请求前缀
var SUBSCRIBE_PREFIX = "/topic"
// 设置订阅消息的请求地址
var SUBSCRIBE = "";
// 设置服务器端点，访问服务器中哪个接口
var SEND_ENDPOINT = "/app/test";
var stack=[]
var currentTime=0
var firstFlag=false;

/* 进行连接 */
function connect() {
    // 设置 SOCKET
    var socket = new SockJS(SOCKET_ENDPOINT);
    // 配置 STOMP 客户端
    stompClient = Stomp.over(socket);
    // STOMP 客户端连接
    stompClient.connect({}, function (frame) {
        alert("连接成功");
    });
}

/* 订阅信息 */
function subscribeSocket(){
    // 设置订阅地址
    SUBSCRIBE = SUBSCRIBE_PREFIX + $("#subscribe").val();
    // 输出订阅地址
    alert("设置订阅地址为：" + SUBSCRIBE);
    // 执行订阅消息

    stompClient.subscribe(SUBSCRIBE, function (responseBody) {
        // console.log(responseBody)
        // console.log("数据后获取时间"+"--"+new Date().getMilliseconds())
        var receiveMessage = JSON.parse(responseBody.body);
        // $("#information").append("<tr><td>" + receiveMessage.content + "</td></tr>");
        // $(".gif_link").attr("src","gifEmoji/"+receiveMessage.link)
        stack.push(receiveMessage.link)
        console.log(stack)
    });

}

//使用定时执行setInterval
var t = setInterval(function(){

    if(stack.length!==0)
    {
        $(".gif_link").attr("src","gifEmoji/"+stack.pop())
    }
    else
    {
       //不动
    }
}, 10000);

/* 断开连接 */
function disconnect() {
    stompClient.disconnect(function() {
        alert("断开连接");
    });
}

/* 发送消息并指定目标地址（这里设置的目标地址为自身订阅消息的地址，当然也可以设置为其它地址） */
function sendMessageNoParameter() {
    if(!firstFlag) {
        firstFlag=true;
        currentTime=new Date().getTime();
        $.cookie('tiem',currentTime)
        var sendContent = $("#content").val();
        // console.log("数据发送时间" + "---" + new Date().getMilliseconds());
        // 设置待发送的消息内容
        var message = '{"destination": "' + SUBSCRIBE + '", "content": "' + sendContent + '"}';
        // 发送消息
        stompClient.send(SEND_ENDPOINT, {}, message);
        // currentTime=new Date().getMilliseconds();
    }
    else
    {
        console.log("cookie"+Number(Number($.cookie('tiem'))+Number(10000)))
        console.log(new Date().getTime())
        if(Number(Number($.cookie('tiem'))+Number(10000))<=new Date().getTime())
        {
            var sendContent = $("#content").val();
            // console.log("数据发送时间" + "---" + new Date().getMilliseconds());
            // 设置待发送的消息内容
            var message = '{"destination": "' + SUBSCRIBE + '", "content": "' + sendContent + '"}';
            // 发送消息
            stompClient.send(SEND_ENDPOINT, {}, message);
            currentTime=new Date().getTime();
            $.cookie('tiem',currentTime)
        }
        else
        {
            alert("时间未到")
        }

    }
}