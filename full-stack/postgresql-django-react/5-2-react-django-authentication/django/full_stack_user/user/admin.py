from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from django.utils.html import format_html
from .models import UserProfile

class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'Profile'
    fk_name = 'user'
    
    # Optional: customize which fields appear in the inline
    fields = ('google_id', 'profile_picture')
    
    # Optional: make certain fields read-only
    readonly_fields = ('google_id',)

class UserAdmin(BaseUserAdmin):
    inlines = (UserProfileInline,)
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'get_google_id', 'show_profile_picture')
    list_select_related = ('profile',)
    search_fields = ('username', 'email', 'first_name', 'last_name', 'profile__google_id')
    list_filter = BaseUserAdmin.list_filter + ('profile__google_id',)
    
    def get_google_id(self, instance):
        return instance.profile.google_id if hasattr(instance, 'profile') else ''
    get_google_id.short_description = 'Google ID'
    get_google_id.admin_order_field = 'profile__google_id'  # Enables column sorting
    
    def show_profile_picture(self, instance):
        if hasattr(instance, 'profile') and instance.profile.profile_picture:
            return format_html('<img src="{}" width="50" height="50" />', instance.profile.profile_picture)
        return "No picture"
    show_profile_picture.short_description = 'Profile Picture'
    
    def get_inline_instances(self, request, obj=None):
        if not obj:
            return list()
        return super(UserAdmin, self).get_inline_instances(request, obj)
    
    # Optional: customize the fieldsets in the user edit form
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Google Authentication', {'fields': ()}),  # Empty as these fields come from the inline
    )

# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)