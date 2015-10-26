<div class="absolute-lang">
    <h6></h6>

    @include('includes.language-chooser')
</div>


<div class="l-12 m-12 s-12 xs-12">
    <div class="landing">
        <div class="header">

            <i class="icon-gulp hidden-s" style="top:50px;left: 10%"></i>
            <i class="icon-ruby hidden-m hidden-xs" style="top:50px; left: 20%"></i>
            <i class="icon-csharp hidden-s" style="top:50px; left: 30%"></i>
            <i class="icon-python hidden-m hidden-xs"style="top:50px; left: 40%"></i>
            <i class="icon-windows hidden-s" style="top:50px; left: 50%"></i>
            <i class="icon-database hidden-m hidden-xs" style="top:50px; left: 60%"></i>
            <i class="icon-angularjs hidden-s" style="top:50px; left: 70%"></i>
            <i class="icon-android hidden-m hidden-xs" style="top:50px; left: 80%"></i>
            <i class="icon-coffee hidden-s" style="top:50px; left: 90%"></i>
            <i class="icon-nodejs hidden-m hidden-xs" style="bottom:50px;left: 10%"></i>
            <i class="icon-wordpress hidden-s" style="bottom:50px; left: 20%"></i>
            <i class="icon-azure hidden-m hidden-xs" style="bottom:50px; left: 30%"></i>
            <i class="icon-css3 hidden-s"style="bottom:50px; left: 40%"></i>
            <i class="icon-d3js hidden-m hidden-xs" style="bottom:50px; left: 50%"></i>
            <i class="icon-ubuntu hidden-s" style="bottom:50px; left: 60%"></i>
            <i class="icon-unity3d hidden-m hidden-xs" style="bottom:50px; left: 70%"></i>
            <i class="icon-laravel-alt hidden-s" style="bottom:50px; left: 80%"></i>
            <i class="icon-fonegap hidden-m hidden-xs" style="bottom:50px; left: 90%"></i>


        </div>
        <div class="landing-text text-center">
            {{ trans("landing.header") }} <br/> {{ trans("landing.header-break") }}
            <div class="subtext">{{ trans("landing.header-sub") }}</div>
        </div>
    </div>
</div>
<div class="clearfix"></div>
<div class="container-fluid" style=" margin-bottom: 20px!important; margin-top: 10px!important;  background-color: white;" >
    <div class="landing-story">


        <div class="row">

            <div class="l-12 m-12 s-12 xs-12">

                <!-- teams start -->

                <div class="l-9 m-9 s-9 xs-12">
                    <div class="step-1">
                        <h4 class="text-left">{{ trans("landing.teams-header") }} </h4>
                        <p>{{ trans("landing.teams-text") }}</p>

                    </div>
                </div>
                <div class="l-3 m-3 s-3 xs-12">
                    <div class="landing-icon-side text-center">
                        <div class="bg-land-side">
                            <i class="icon-group text-right"></i>
                            <div class="clearfix"></div>
                        </div>
                        <a href="{{App::getLocale()}}/teams" class="button button-link">go to teams</a>
                    </div>
                </div>

                <div class="clearfix"></div>

                <!-- teams end -->

                <!-- inquirer start -->

                <divs class="l-3 m-3 s-3 xs-12">
                    <div class="landing-icon-side text-center">
                        <div class="bg-land-side">
                            <i class="icon-list-alt text-right"></i>
                            <div class="clearfix"></div>
                        </div>
                        <a href="{{App::getLocale()}}/inquirer" class="button button-link">go to inquirer</a>
                    </div>
                </divs>

                <div class="l-9 m-9 s-9 xs-12">
                    <div class="step-2">
                        <h4 class="text-right">{{ trans("landing.inquirer-header") }}</h4>
                        <p>{{ trans("landing.inquirer-text") }}</p>

                    </div>
                </div>

                <div class="clearfix"></div>

                <!-- inquirer end -->


                <!-- blog start  -->
                <div class="l-9 m-9 s-9 xs-12">
                    <div class="step-3">
                    <span class="landing-side">

                    <h4 class="text-left">{{ trans("landing.blog-header") }}  </h4>

                        <p>{{ trans("landing.blog-text") }}</p>

                    </span>
                    </div>
                </div>
                <div class="l-3 m-3 s-3 xs-12">
                    <div class="landing-icon-side text-center">
                        <div class="bg-land-side">
                            <i class="icon-pencil-square  text-right"></i>
                            <div class="clearfix"></div>
                        </div>

                        <a href="{{App::getLocale()}}/blog" class="button button-link  text-right">go to blog</a>

                    </div>
                </div>


                <div class="clearfix"></div>
                <!-- blog end -->

                <div class="l-3 m-3 s-3 xs-12">
                    <div class="landing-icon-side text-center">
                        <div class="bg-land-side">
                            <i class="icon-graduation-cap text-right"></i>
                            <div class="clearfix"></div>
                        </div>
                        <a href="{{App::getLocale()}}/idea-share" class="button button-link">go to idea-share</a>
                    </div>
                </div>

                <div class="l-9 m-9 s-9 xs-12">
                    <div class="step-4">
                        <h4 class="text-right">{{ trans("landing.idea-share-header") }} </h4>
                        <p>{{ trans("landing.idea-share-text") }} </p>
                    </div>
                </div>


            </div>
        </div>
    </div>
</div>
