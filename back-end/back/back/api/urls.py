from django.urls import path
from api.views import base, auth, generic_cbv

urlpatterns = [
    path('status/', base.status),  # CREATE
    path('company/<int:pk>/', base.CompanyView.as_view()),  # UPDATE, GET, DELETE
    path('companies/', base.CompaniesView.as_view()),  # CREATE
    path('position/', base.position),  # CREATE, # GET LIST OF ALL

    path('user-applications/', base.UserApplicationView.as_view()),  # GET
    path('user-applications/filter/<int:pk>/', generic_cbv.UserApplicationAPIView.as_view()),
    path('user-applications/<int:pk>/', base.UserApplicationUpdateDelete.as_view()),

    #path('user-application/<int:pk>/', generic_cbv.UserApplicationAPIView.as_view()), # UPDATE,  GET list related to user, DELETE

    path('schedule/', generic_cbv.ScheduleAPIView.as_view()),  # CREATE
    path('schedule/<int:pk>/', generic_cbv.ScheduleAPIView.as_view()),  # UPDATE, GET list related to user, DELETE

    path('users/', auth.UsersListCreate.as_view()),
    path('login/', auth.login),
    path('logout/', auth.logout),
]
