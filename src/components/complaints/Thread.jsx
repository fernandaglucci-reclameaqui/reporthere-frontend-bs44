import React, { useState, useEffect } from 'react';
import { ComplaintMessage } from '@/api/entities';
import { User } from '@/api/entities';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Send, User as UserIcon, Building2, Shield } from 'lucide-react';
import { SendEmail } from "@/api/integrations";
import { createPageUrl } from '@/utils';

export default function Thread({ complaint, user, isBusinessOwner }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      if (complaint?.id) {
        const fetchedMessages = await ComplaintMessage.filter({ complaint_id: complaint.id }, 'created_at');
        setMessages(fetchedMessages);
      }
    };
    fetchMessages();
  }, [complaint]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !complaint) return;

    setIsSubmitting(true);
    try {
      const authorType = isBusinessOwner ? 'business' : user.user_type === 'admin' ? 'admin' : 'consumer';
      
      const createdMessage = await ComplaintMessage.create({
        complaint_id: complaint.id,
        author_id: user.id,
        body: newMessage,
        author_type: authorType,
      });

      // Send email notification on business reply
      if (isBusinessOwner) {
        const consumer = await User.get(complaint.created_by);
        if (consumer && consumer.email) {
          await SendEmail({
            to: consumer.email,
            subject: `Update on your complaint against ${complaint.company_name}`,
            body: `The business has responded to your complaint: "${complaint.title}".\n\nPlease log in to view the response and continue the conversation.\n\n${window.location.origin}${createPageUrl(`complaint/${complaint.id}`)}`
          });
        }
      }

      setMessages([...messages, { ...createdMessage, author_email: user.email, author_type: authorType }]);
      setNewMessage('');
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Could not send your message. Please try again.");
    }
    setIsSubmitting(false);
  };

  const getAuthorInfo = (message) => {
    switch (message.author_type) {
      case 'business':
        return { name: complaint.company_name, Icon: Building2, alignment: 'items-start', bubble: 'bg-blue-100' };
      case 'admin':
        return { name: 'ReportHere Admin', Icon: Shield, alignment: 'items-start', bubble: 'bg-yellow-100' };
      case 'consumer':
      default:
        return { name: 'You', Icon: UserIcon, alignment: 'items-end', bubble: 'bg-green-100' };
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6 mb-6 h-96 overflow-y-auto pr-4">
          {messages.map((msg) => {
            const { name, Icon, alignment, bubble } = getAuthorInfo(msg);
            const isConsumer = msg.author_type === 'consumer';
            return (
              <div key={msg.id} className={`flex gap-3 ${isConsumer ? 'justify-end' : 'justify-start'}`}>
                {!isConsumer && <Icon className="w-8 h-8 text-gray-500 mt-1" />}
                <div className={`flex flex-col ${isConsumer ? 'items-end' : 'items-start'} max-w-lg`}>
                  <span className="font-semibold text-sm text-gray-800 mb-1">{name}</span>
                  <div className={`p-4 rounded-lg ${bubble}`}>
                    <p className="text-gray-800 whitespace-pre-wrap">{msg.body}</p>
                  </div>
                   <span className="text-xs text-gray-400 mt-1">
                      {new Date(msg.created_at).toLocaleString()}
                    </span>
                </div>
                 {isConsumer && <Icon className="w-8 h-8 text-gray-500 mt-1" />}
              </div>
            );
          })}
        </div>
        {user && (complaint.status !== 'resolved' && complaint.status !== 'rejected') && (
          <form onSubmit={handleSubmit} className="border-t pt-4">
            <div className="relative">
              <Textarea
                placeholder={isBusinessOwner ? "Post an official company response..." : "Write a reply..."}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="pr-20"
                rows={4}
                disabled={isSubmitting}
              />
              <Button type="submit" size="icon" className="absolute top-3 right-3" disabled={isSubmitting || !newMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}