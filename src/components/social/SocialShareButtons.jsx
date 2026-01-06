import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Twitter, Facebook, Linkedin, Link2, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function SocialShareButtons({ 
  url, 
  title, 
  description,
  hashtags = ['ConsumerRights', 'ReportHere']
}) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url || window.location.href);
  const encodedTitle = encodeURIComponent(title || document.title);
  const encodedDescription = encodeURIComponent(description || '');
  const encodedHashtags = hashtags.join(',');

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${encodedHashtags}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const openShareWindow = (url) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => openShareWindow(shareLinks.twitter)}>
          <Twitter className="w-4 h-4 mr-2 text-blue-400" />
          Share on Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openShareWindow(shareLinks.facebook)}>
          <Facebook className="w-4 h-4 mr-2 text-blue-600" />
          Share on Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openShareWindow(shareLinks.linkedin)}>
          <Linkedin className="w-4 h-4 mr-2 text-blue-700" />
          Share on LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyToClipboard}>
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2 text-green-600" />
              Link Copied!
            </>
          ) : (
            <>
              <Link2 className="w-4 h-4 mr-2" />
              Copy Link
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
