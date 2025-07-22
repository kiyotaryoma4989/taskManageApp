require 'bcrypt'

User.create!([
  {
    user_id: "user1",
    password_digest: BCrypt::Password.create("password1")
  },
  {
    user_id: "user2",
    password_digest: BCrypt::Password.create("password2")
  },
  {
    user_id: "user3",
    password_digest: BCrypt::Password.create("password3")
  },
  {
    user_id: "user4",
    password_digest: BCrypt::Password.create("password4")
  },
  {
    user_id: "user5",
    password_digest: BCrypt::Password.create("password5")
  }
])

Category.create!([
  {
    name: "💼 仕事"
  },
  {
    name: "🎨 デザイン"
  },
  {
    name: "📝 文書作成"
  },
  {
    name: "💻 開発"
  },
  {
    name: "🎉 イベント"
  },
  {
    name: "👤 個人"
  },
  {
    name: "🤝 会議"
  },
  {
    name: "📚 学習"
  }
])

Todo.create!([
  {
    user_id: 1,
    title: "買い物に行く",
    description: "スーパーで食材を購入",
    category_id: 1,
    due_date: Date.today + 1,
    priority: 2,
    done: false,
    delete_flg: false
  },
  {
    user_id: 1,
    title: "勉強",
    description: "Railsのチュートリアルを進める",
    category_id: 2,
    due_date: Date.today + 3,
    priority: 1,
    done: false,
    delete_flg: false
  },
  {
    user_id: 1,
    title: "運動",
    description: "ジムでトレーニング",
    category_id: 3,
    due_date: Date.today + 2,
    priority: 3,
    done: false,
    delete_flg: false
  },
  {
    user_id: 1,
    title: "洗濯",
    description: "溜まった洗濯物を片付ける",
    category_id: 1,
    due_date: Date.today,
    priority: 2,
    done: true,
    delete_flg: false
  },
  {
    user_id: 1,
    title: "映画を観る",
    description: "友達と映画館へ",
    category_id: 4,
    due_date: Date.today + 5,
    priority: 1,
    done: false,
    delete_flg: true
  }
])
