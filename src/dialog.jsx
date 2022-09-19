import React from 'react';
import { styled, keyframes } from '@stitches/react';
import { violet, blackA, mauve, green } from '@radix-ui/colors';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import Toolbar from './toolbar';
import SortableFormElements from './sortable-form-elements';

const { PlaceHolder } = SortableFormElements;

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: blackA.blackA9,
  position: 'fixed',
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

const StyledContent = styled(DialogPrimitive.Content, {
  zIndex: 10000,
  backgroundColor: 'white',
  borderRadius: 6,
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '600px',
  maxHeight: 'fit-content',
  padding: 25,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&:focus': { outline: 'none' },
});

function Content({ children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props}>{children}</StyledContent>
    </DialogPrimitive.Portal>
  );
}

const StyledTitle = styled(DialogPrimitive.Title, {
  margin: 0,
  fontWeight: 500,
  color: mauve.mauve12,
  fontSize: 17,
});

const StyledDescription = styled(DialogPrimitive.Description, {
  margin: '10px 0 20px',
  color: mauve.mauve11,
  fontSize: 15,
  lineHeight: 1.5,
});

// Exports
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogContent = Content;
export const DialogTitle = StyledTitle;
export const DialogDescription = StyledDescription;
export const DialogClose = DialogPrimitive.Close;

// Your app...
const Flex = styled('div', { display: 'flex' });

const Button = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  fontSize: 24,
  lineHeight: 1,
  fontWeight: 500,
  width: '100%',
  minHeight: 72,
  textAlign: 'center',
  fontVariant: 'small-caps',

  variants: {
    variant: {

      default: {
        backgroundColor: 'transparent',
        color: violet.violet11,
        border: '1px dashed #ccc',
        borderColor: violet.violet11,
        '&:hover': { backgroundColor: mauve.mauve3 },
        '&:focus': { boxShadow: '0 0 0 2px black' },
      },

      violet: {
        backgroundColor: 'white',
        color: violet.violet11,
        boxShadow: `0 2px 10px ${blackA.blackA7}`,
        '&:hover': { backgroundColor: mauve.mauve3 },
        '&:focus': { boxShadow: '0 0 0 2px black' },
      },
      green: {
        backgroundColor: green.green4,
        color: green.green11,
        '&:hover': { backgroundColor: green.green5 },
        '&:focus': { boxShadow: `0 0 0 2px ${green.green7}` },
      },
    },
  },

  defaultVariants: {
    variant: 'default',
  },
});

const Fieldset = styled('fieldset', {
  all: 'unset',
  display: 'flex',
  gap: 20,
  alignItems: 'center',
  marginBottom: 15,
});

const DialogDemo = ({ toolbarProps, customToolbarItems, children }) => (
  <Dialog>
    <DialogTrigger asChild>
    <Button size="large">
     {children || 'Adicionar Elementos'}
    </Button>
    </DialogTrigger>
    <DialogContent >
      <DialogTitle>Construir Prontuário</DialogTitle>
      <DialogDescription>
        Adicione os elementos a sua escolha:
      </DialogDescription>
      <Fieldset>
        <Toolbar {...toolbarProps} customItems={customToolbarItems} />
      </Fieldset>
      <Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>
        <DialogClose asChild>
          <Button variant="green">Concluir</Button>
        </DialogClose>
      </Flex>
      {/* <DialogClose asChild>
        <IconButton aria-label="Close">
          <Cross2Icon />
        </IconButton>
      </DialogClose> */}
    </DialogContent>
  </Dialog>
);

export default DialogDemo;
