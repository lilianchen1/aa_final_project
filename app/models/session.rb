class Session < ActiveRecord::Base
  belongs_to :user

  validates :user, :session_token, presence: true
  validates :session_token, uniqueness: true
  after_initialize :set_user_token

  def set_user_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end
end
