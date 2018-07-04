let socket = io();
let nickname; //ID this user

// COPY 
let clipboard = new ClipboardJS('.item');

clipboard.on('success', e => {
	alert('Copyed ID');
});

if (localStorage.getItem('user_nickname') != null) {
    nickname = localStorage.getItem('user_nickname');
} else {
	let rnd_id = rnd(0, 1000000);
    localStorage.setItem('user_nickname', rnd_id)
    nickname = rnd_id;
}

let menu = new Vue ({
	el: '#menu',
	data: {
		nickname: nickname
	}
});

let messages = new Vue ({
	el: '#messages',
	data: {
		messages_all: []
	}
});

let control = new Vue ({
	el: '#control',
	data: {
		id_user: '',
		message: ''
	},
	methods: {
		send_message: () => {
			if (control.$data.id_user == '' || control.$data.message == '') {
				alert('Error')
			} else {
				messages.$data.messages_all.push({
					nickname: 'You',
					color: '',
					message: clearHtml(control.$data.message),
					time: getTime()
				});

				socket.emit('add message', {
	                userid: control.$data.id_user,
	                nickname: nickname,
	                color: 'green',
	                message: clearHtml(control.$data.message),
	                time: getTime()
	            });
				
				control.$data.message = ''; //clear message input

	            scrollEnd();
			}
		}
	}
});

socket.on('send message', data => {
	if (data.userid == nickname) {
		messages.$data.messages_all.push(data);
		scrollEnd();
	}
});
