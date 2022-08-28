require 'rails_helper'

RSpec.describe User, type: :model do

  before(:each) do
    @user = FactoryBot.create(:user)
  end

  context "validation" do

    it "is valid with valid attributes" do
      expect(@user).to be_a(User)
      expect(@user).to be_valid
    end

    describe "#email" do
      it "should not be valid without email" do
        bad_user = FactoryBot.build(:user, email: nil)
        expect(bad_user).not_to be_valid
        expect(bad_user.errors.include?(:email)).to eq(true)
      end
    end

    describe "#last_name" do
      it "should not be valid with short last_name" do
        bad_user = FactoryBot.build(:user, last_name: "a")
        expect(bad_user).not_to be_valid
        expect(bad_user.errors.include?(:last_name)).to eq(true)
      end
    end

    describe "#first_name" do
      it "should not be valid with short first_name" do
        bad_user = FactoryBot.build(:user, first_name: "a")
        expect(bad_user).not_to be_valid
        expect(bad_user.errors.include?(:first_name)).to eq(true)
      end
    end
  end

  context "associations" do

    it "is valid with valid associations" do
      expect(@user).to be_a(User)
      expect(@user).to be_valid
    end

    describe "some association" do
      ##
    end
  end

  context "callbacks" do

    describe "some callbacks" do
      ##
    end
  end

  context "public instance methods" do

    describe "#some_method" do
      ##
    end
  end

  context "public class methods" do

    describe "self.some_method" do
      ##
    end
  end
end
