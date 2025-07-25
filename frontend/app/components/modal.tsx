// WithdrawalModal.tsx
import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop'
import CloseIcon from '@mui/icons-material/Close'
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 583,
  minWidth: 320,
  bgcolor: '#1e1e1e',
  boxShadow: 24,
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  p: 0,
  zIndex: 1300,
  maxHeight: '90vh',
  overflow: 'auto',
}

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  pt: 3,
  pb: 2,
  px: 2,
}

const optionsContainerStyle = {
  width: '100%',
  padding: '0 20px 20px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
}

const optionStyle = {
  width: '100%',
  bgcolor: '#272727',
  borderRadius: '8px',
  p: 2,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    bgcolor: '#333333',
  },
}

const iconStyle = {
  color: 'white',
  fontSize: 20,
  mr: 2,
}

const iconContainerStyle = {
  width: 24,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}

// Custom backdrop style with blur effect
const backdropStyle = {
  backdropFilter: 'blur(8px)',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
}

type WithdrawalModalProps = {
  open: boolean
  handleClose: () => void
  onSelectOption: (option: string) => void
}

export default function WithdrawalModal({
  open,
  handleClose,
  onSelectOption,
}: WithdrawalModalProps) {
  const handleOptionClick = (option: string) => {
    onSelectOption(option)
    handleClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="withdrawal-modal-title"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          sx: backdropStyle,
          timeout: 500,
        },
      }}
    >
      <Box sx={style}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            p: 1.5,
          }}
        >
          <CloseIcon
            onClick={handleClose}
            sx={{ cursor: 'pointer', color: 'gray' }}
          />
        </Box>

        <Box sx={headerStyle}>
          <Typography
            id="withdrawal-modal-title"
            variant="h4"
            component="h2"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: { xs: 24, sm: 28, md: 36 },
              lineHeight: 1.2,
            }}
          >
            Withdraw
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              color: 'gray',
              mt: 1.5,
              fontSize: { xs: 14, sm: 16 },
              px: 1,
            }}
          >
            Choose a preferred withdrawal process
          </Typography>
        </Box>

        <Box sx={optionsContainerStyle}>
          <Box sx={optionStyle} onClick={() => handleOptionClick('wallet')}>
            <Box sx={iconContainerStyle}>
              <AccountBalanceWalletOutlinedIcon sx={iconStyle} />
            </Box>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                sx={{
                  color: 'white',
                  fontWeight: 'medium',
                  mb: 0.5,
                  fontSize: { xs: 14, sm: 16 },
                }}
              >
                Send to a Wallet
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'gray',
                  fontSize: { xs: 12, sm: 14 },
                }}
              >
                Send to an external wallet address.
              </Typography>
            </Box>
          </Box>

          <Box sx={optionStyle} onClick={() => handleOptionClick('email')}>
            <Box sx={iconContainerStyle}>
              <EmailOutlinedIcon sx={iconStyle} />
            </Box>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                sx={{
                  color: 'white',
                  fontWeight: 'medium',
                  mb: 0.5,
                  fontSize: { xs: 14, sm: 16 },
                }}
              >
                Send Via Email
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'gray',
                  fontSize: { xs: 12, sm: 14 },
                }}
              >
                Send tokens and funds via email.
              </Typography>
            </Box>
          </Box>

          <Box sx={optionStyle} onClick={() => handleOptionClick('qr')}>
            <Box sx={iconContainerStyle}>
              <QrCodeScannerOutlinedIcon sx={iconStyle} />
            </Box>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                sx={{
                  color: 'white',
                  fontWeight: 'medium',
                  mb: 0.5,
                  fontSize: { xs: 14, sm: 16 },
                }}
              >
                Send QR Code
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'gray',
                  fontSize: { xs: 12, sm: 14 },
                }}
              >
                Send to an external wallet address by scanning QR code.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}
