const API = "http://localhost:5000/api";

export async function getPolicies() {
  const res = await fetch(`${API}/policies`);
  return res.json();
}

export async function getMyClaims(claimantId: string = 'USR-001') {
  const res = await fetch(`${API}/claims/my-claims?claimantId=${claimantId}`);
  return res.json();
}

export async function submitClaim(payload: any) {
  const res = await fetch(`${API}/claims`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.details || 'Failed to submit claim');
  }
  return res.json();
}

export async function withdrawClaimApi(claimId: string) {
  const res = await fetch(`${API}/claims/${claimId}/withdraw`, {
    method: 'PATCH',
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.details || 'Failed to withdraw claim');
  }
  return res.json();
}
