import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  color: ${({ theme }) => theme.textSoft};
  > h1 {
    color: ${({ theme }) => theme.text};
    margin-bottom: 40px;
  }
  > p {
    color: ${({ theme }) => theme.textSoft};
    margin-bottom: 40px;
  }
`

const TermsAndConditions = () => {
  return (
    <Container>
      <h1>Terms and Conditions</h1>
      <h2>1. Acceptance of Terms</h2>
      <p>
        By using this platform TubeLand, you agree to comply with and be bound
        by the following terms and conditions . If you do not agree to these
        Terms, please do not use the TubeLand.
      </p>
      <h2>2. Use of the TubeLand</h2>
      <p>
        a. You may only upload content that is non-violent, non-explicit, and
        compliant with all applicable laws and regulations.
        <br />
        <br /> b. You are solely responsible for the content you upload and any
        consequences arising from it.
      </p>
      <h2> 3. User Behavior</h2>
      <p>
        a. You agree to interact respectfully and courteously with other users
        and refrain from engaging in any form of harassment, hate speech, or
        harmful conduct. <br />
        <br />
        b. You may not use the TubeLand for any illegal, unauthorized, or
        harmful purposes.
      </p>
      <h2>4. Privacy</h2>
      <p>
        Your use of the TubeLand is also governed by our Privacy Policy. Please
        review our Privacy Policy to understand how we collect, use, and
        disclose your personal information.
      </p>
      <h2>5. Termination</h2>
      <p>
        We reserve the right to terminate or suspend your account and access to
        the TubeLand at our sole discretion if you violate these Terms.
      </p>
      <h2> 6. Changes to Terms</h2>
      <p>
        We may revise and update these Terms from time to time. Any changes will
        be effective immediately upon posting. Please review these Terms
        regularly to stay informed of any changes.
      </p>
    </Container>
  )
}

export default TermsAndConditions
