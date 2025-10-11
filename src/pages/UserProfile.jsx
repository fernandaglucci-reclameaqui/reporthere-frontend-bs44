import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@/api/entities';
import { createPageUrl } from '@/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, User as UserIcon, Edit, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function UserProfilePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        profile_image: ''
    });

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const currentUser = await User.me();
                setUser(currentUser);
                setFormData({
                    full_name: currentUser.full_name || '',
                    phone: currentUser.phone || '',
                    profile_image: currentUser.profile_image || ''
                });
            } catch (error) {
                toast.error("You must be logged in to view this page.");
                navigate(createPageUrl('Home'));
            }
            setLoading(false);
        };
        fetchUser();
    }, [navigate]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await User.updateMyUserData(formData);
            const updatedUser = await User.me();
            setUser(updatedUser);
            setIsEditing(false);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Failed to update profile:", error);
            toast.error("Failed to update profile. Please try again.");
        }
        setLoading(false);
    };

    if (loading && !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-2xl mx-auto px-4">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Personal Information</CardTitle>
                        {!isEditing && (
                            <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                                <Edit className="w-4 h-4" />
                            </Button>
                        )}
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                                    {formData.profile_image ? (
                                        <img src={formData.profile_image} alt="Profile" className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        <UserIcon className="w-10 h-10 text-gray-400" />
                                    )}
                                </div>
                                {isEditing && (
                                    <div className="flex-1">
                                        <Label htmlFor="profile_image">Profile Image URL</Label>
                                        <Input
                                            id="profile_image"
                                            value={formData.profile_image}
                                            onChange={handleInputChange}
                                            placeholder="https://example.com/image.png"
                                        />
                                    </div>
                                )}
                            </div>
                            
                            <div>
                                <Label htmlFor="full_name">Full Name</Label>
                                <Input
                                    id="full_name"
                                    value={formData.full_name}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                            </div>
                            
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" value={user?.email || ''} disabled />
                            </div>

                            <div>
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                            </div>

                            {isEditing && (
                                <div className="flex justify-end gap-4 pt-4 border-t">
                                    <Button variant="outline" onClick={() => setIsEditing(false)} disabled={loading}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSave} disabled={loading}>
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}