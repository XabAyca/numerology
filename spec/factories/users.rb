FactoryBot.define do
  factory :user do
    email      { "john_doe@test.fr" }
    first_name { "John" }
    last_name  { "Doe" }
    birthday   { Date.new(1991,8,6) }
    password   { "password" }
    trait :admin do
      admin    { true }
    end
  end
end
