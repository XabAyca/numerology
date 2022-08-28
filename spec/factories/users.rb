FactoryBot.define do
  factory :user do
    email      { Faker::Internet.email }
    first_name { Faker::Name.first_name  }
    last_name  { Faker::Name.last_name  }
    birthday   { Faker::Date.birthday(min_age: 1, max_age: 65) }
    password   { "password" }
    trait :admin do
      admin    { true }
    end
  end
end
