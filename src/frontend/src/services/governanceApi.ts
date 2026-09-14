const API = "http://localhost:4000/api";

export async function getAnalytics() {
  const response = await fetch(
    `${API}/analytics/overview`
  );

  return response.json();
}

export async function getAuditTrail(
  claimId: string
) {
  const response = await fetch(
    `${API}/claims/${claimId}/audit-trail`
  );

  return response.json();
}

export async function disburseClaim(
  claimId: string,
  paymentMethod: string
) {
  const response = await fetch(
    `${API}/claims/${claimId}/disburse`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        paymentMethod
      })
    }
  );

  return response.json();
}

export async function resetSeed() {
  const response = await fetch(
    `${API}/system/reset-seed`,
    {
      method: "POST"
    }
  );

  return response.json();
}