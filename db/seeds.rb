categories = [
  "💼 仕事",
  "🎨 デザイン",
  "📝 文書作成",
  "💻 開発",
  "🎉 イベント",
  "👤 個人",
  "🤝 会議",
  "📚 学習"
]

categories.each do |name|
  Category.find_or_create_by!(name: name)
end
