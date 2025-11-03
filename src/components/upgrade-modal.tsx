"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { authClient } from "@/lib/auth-client";
 
interface UpgradeModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export const UpgradeModal = ({
    open,
    onOpenChange
}: UpgradeModalProps) => {
    return(
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Upgrade To Pro</AlertDialogTitle>
                    <AlertDialogDescription>
                        You need an active subscription to perform this action. Updgrade to
                        Pro to Unlcok all features
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancle</AlertDialogCancel>
                    <AlertDialogAction 
                        onClick={() => authClient.checkout({ slug: "pro"})}
                    >
                    Upgrade now
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>  
    )
}