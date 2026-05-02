"""一次性：透過 OAuth Desktop App + GA Admin API 把 reportwang-ga-reader SA 加為 GA4 property 532405604 的 Viewer。
繞過 GA4 UI 的嚴格 email 驗證，直接呼叫 Admin API 寫入授權。
執行後可在 GA4 UI → Property Access Management 確認 SA 已出現。
"""
from google_auth_oauthlib.flow import InstalledAppFlow
from google.analytics import admin_v1alpha

PROPERTY_ID = "532405604"
SA_EMAIL = "reportwang-ga-reader@reportwang.iam.gserviceaccount.com"
OAUTH_CLIENT = "/Users/happinessmed/.config/gcloud/reportwang-oauth-desktop.json"
SCOPES = ["https://www.googleapis.com/auth/analytics.manage.users"]

flow = InstalledAppFlow.from_client_secrets_file(OAUTH_CLIENT, SCOPES)
creds = flow.run_local_server(port=0)  # 開瀏覽器跑 OAuth

print("✓ OAuth 完成，scopes:", creds.scopes)

client = admin_v1alpha.AnalyticsAdminServiceClient(credentials=creds)
binding = admin_v1alpha.AccessBinding(user=SA_EMAIL, roles=["predefinedRoles/viewer"])

resp = client.create_access_binding(
    parent=f"properties/{PROPERTY_ID}",
    access_binding=binding,
)
print("✓ Created binding:", resp.name)
