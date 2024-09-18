// src/components/CloseChatDialog.tsx

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

interface CloseChatDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const CloseChatDialog: React.FC<CloseChatDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Close</DialogTitle>
      <DialogContent>
        Are you sure you want to close the chat?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CloseChatDialog;
