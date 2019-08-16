# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user1 = User.create!(name:"Riti", grade:"Junior", email: 'riti@gmail.com', password: '123456')
user2 = User.create!(name:"Svet", grade:"Senior", email: 'rit@gmail.com', password: '123456')
user3 = User.create!(name: "Erin", grade:"Freshman", email: 'ri@gmail.com', password: '123456')
user4 = User.create!(name: "David", grade:"Super Senior", email: 'r@gmail.com', password: '123456')

group1 = Group.create!(name:"Calculus 2", description:"Study group for calc 2 midterm")
group2 = Group.create!(name:"Geology", description:"Study group for geology labs")

post1 = Post.create!(title:"Homework 2", message:"Does anyone have solutions to homework 2?", user: user1, group: group1)

group1.users.push(user1)
group2.users.push(user2)
group1.users.push(user3)


