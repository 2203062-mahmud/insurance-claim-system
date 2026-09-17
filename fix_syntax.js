const fs = require('fs');
let code = fs.readFileSync('src/frontend/src/components/claimant/ClaimantPortal.tsx', 'utf8');

code = code.replace(
  `} catch (err: any) { alert(err.message); }
  } catch (err: any) { alert(err.message); }
  }`,
  `} catch (err: any) { alert(err.message); }
  }`
);

fs.writeFileSync('src/frontend/src/components/claimant/ClaimantPortal.tsx', code);
