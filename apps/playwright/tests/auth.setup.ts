import { test as setup } from "@playwright/test"
import { notNeedAuthCloudRequest } from "@zweb-public/zweb-net"

const authFile = ".auth/user.json"

setup("authenticate", async ({ page }) => {
  const result = await notNeedAuthCloudRequest({
    method: "POST",
    url: "/auth/signin",
    data: {
      email: process.env.ZWEB_CLOUD_USER_EMAIL,
      password: process.env.ZWEB_CLOUD_USER_PASSWORD,
    },
  })
  const token = result.headers["zweb-token"]
  await page.goto(
    `/${process.env.ZWEB_CLOUD_TEAM_IDENTITY}/dashboard/apps?token=${token}`,
  )
  await page.context().storageState({ path: authFile })
})
