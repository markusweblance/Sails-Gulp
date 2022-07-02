process.env.DEV = 'true';

let instances = {
	text: {
		title: 'Главная',
		model: 'mainPage',

		fields: {
			name: 'Name',
			title: 'Заголовок',
			content: {
				title: "Текст",
				type: "wysiwyg",
			},
			image: {
				type: 'image',
				widget: 'FileUploader', // type of widget
				FileUploader: { // widget configuration
					filesize: 2,
					accepted: ['pdf', 'avi']
				},
				displayModifier: function (data) {
					if (data) {
						return `<img src="${data[0].urlS}"/>`
					} else {
						return `<p>No Image</p>`
					}
				}
			},
			createdAt: false,
			updatedAt: false
		},
		list: {
			fields: {
				id: false,
				name: false
			}
		},
		add: {
			fields: {
				id: false,
				name: 'Name'
			}
		},
		edit: {
			fields: {
				id: false,
				name: false
			}
		},
		icon: "file-alt"
	}
};

module.exports.adminpanel = {
	generator: {
		path: 'forms',
		forms: {
			global_config: {
				email: {
					title: "Email",
					type: "string",
					required: true
				}
			}
		}
	},
	navbar: {
		additionalLinks: [
			{
				id: '0',
				title: "Настройки",
				link: "/admin/form/global_config",
				icon: "tools"
			}
		]
	},
	brand: {
		link: {
			id: '1',
			title: "ДоброМед",
			link: "/",
			icon: ""
		}
	},
		sections: [
			{
				title: 'Website',
				link: '/'
			},
		],
		welcome: {
			// title: "hello ",
			// text: "world"
		},
		menu: {
			actions: [
				{
					link: 'https://www.google.com.ua/',
					title: 'Link to google'
				}
			]
		},
		translation: {
			locales: ['ru', 'en', 'de', 'ua'],
			path: 'config/locales/adminpanel', // relative path to translations directory
			defaultLocale: 'ru'
		},
		instances: instances
	};
