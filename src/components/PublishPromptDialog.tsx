
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, Loader2 } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { publishPrompt } from '@/services/firestoreService';
import { useToast } from '@/hooks/use-toast';

interface PublishPromptDialogProps {
  promptContent: string;
}

const PublishPromptDialog: React.FC<PublishPromptDialogProps> = ({ promptContent }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('general');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handlePublish = async () => {
    if (!title.trim()) {
      toast({
        variant: "destructive",
        title: "Title required",
        description: "Please provide a title for your prompt",
      });
      return;
    }

    setIsPublishing(true);
    try {
      await publishPrompt(title, promptContent, category, isAnonymous);
      toast({
        title: "Prompt published!",
        description: "Your prompt has been successfully shared to the gallery",
      });
      setOpen(false);
      // Reset form
      setTitle('');
      setCategory('general');
      setIsAnonymous(false);
    } catch (error) {
      console.error("Error publishing prompt:", error);
      toast({
        variant: "destructive",
        title: "Publishing failed",
        description: "There was an error publishing your prompt. Please try again.",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-white/10 hover:bg-white/5 group">
          <Upload className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
          Publish
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black/70 backdrop-blur-xl border-white/10 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="gradient-text">Publish Your Prompt</DialogTitle>
          <DialogDescription className="text-white/70">
            Share your engineered prompt with the Promgine community
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your prompt a descriptive title"
              className="col-span-3 bg-black/30 border-white/10"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="col-span-3 bg-black/30 border-white/10">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/10">
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="writing">Writing</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="programming">Programming</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div></div>
            <div className="flex items-center space-x-2 col-span-3">
              <Checkbox 
                id="anonymous" 
                checked={isAnonymous}
                onCheckedChange={(checked) => setIsAnonymous(checked === true)}
              />
              <label
                htmlFor="anonymous"
                className="text-sm font-medium leading-none cursor-pointer text-white/80"
              >
                Publish anonymously
              </label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button 
            type="submit" 
            onClick={handlePublish} 
            disabled={isPublishing}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            {isPublishing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Publishing...
              </>
            ) : (
              <>Publish Prompt</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PublishPromptDialog;
