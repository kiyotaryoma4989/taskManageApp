require 'bcrypt'

User.create!([
  {
    userId: "user1",
    password_digest: BCrypt::Password.create("password1")
  },
  {
    userId: "user2",
    password_digest: BCrypt::Password.create("password2")
  },
  {
    userId: "user3",
    password_digest: BCrypt::Password.create("password3")
  },
  {
    userId: "user4",
    password_digest: BCrypt::Password.create("password4")
  },
  {
    userId: "user5",
    password_digest: BCrypt::Password.create("password5")
  }
])

Todo.create!([
  {
    user_id: 1,
    title: "買い物に行く",
    description: "スーパーで食材を購入",
    category: 1,
    dueDate: Date.today + 1,
    priority: 2,
    done: false,
    deleteFlg: false
  },
  {
    user_id: 1,
    title: "勉強",
    description: "Railsのチュートリアルを進める",
    category: 2,
    dueDate: Date.today + 3,
    priority: 1,
    done: false,
    deleteFlg: false
  },
  {
    user_id: 1,
    title: "運動",
    description: "ジムでトレーニング",
    category: 3,
    dueDate: Date.today + 2,
    priority: 3,
    done: false,
    deleteFlg: false
  },
  {
    user_id: 1,
    title: "洗濯",
    description: "溜まった洗濯物を片付ける",
    category: 1,
    dueDate: Date.today,
    priority: 2,
    done: true,
    deleteFlg: false
  },
  {
    user_id: 1,
    title: "映画を観る",
    description: "友達と映画館へ",
    category: 4,
    dueDate: Date.today + 5,
    priority: 1,
    done: false,
    deleteFlg: true
  }
])
