<?php namespace itway\Http\Controllers;

use itway\Http\Requests;
use Itway\Repositories\Posts\PostsRepository;
use itway\User;
use Itway\Repositories\Users\UserRepository;
use Input;
use itway\Role;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Itway\Validation\User\UsersFormRequest;
use Itway\Validation\User\UsersUpdateFormRequest;
use Request;
use itway\Post;
use Toastr;

class AdminUsersController extends Controller {

    private $userRepository;
    private $postRepository;

    public function __construct(UserRepository $userRepository, PostsRepository $postRepository)
    {
        $this->userRepository = $userRepository;
        $this->postRepository = $postRepository;

    }

    /**
     * Redirect not found.
     *
     * @return Response
     */
    protected function redirectNotFound()
    {
        return redirect()->to(\App::getLocale().'/admin/users');
    }
    /**
     * Display a listing of users
     *
     * @return Response
     */
    public function index()
    {
        $users = $this->userRepository->allOrSearch(Input::get('q'));

        $no = $users->firstItem();

        return view('admin.users.index', compact('users', 'no'));
    }

    /**
     * create user page
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        $roles = Role::all()->lists('name', 'id');

        return view('admin.users.create', compact('roles'));
    }

    /**
     * store created user
     *
     * @param UsersFormRequest $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function store(UsersFormRequest $request)
    {
        $data = $request->all();

        $user = $this->userRepository->create($data);

        $user->attachRole($request->get('role'));

        return redirect()->to(\App::getLocale().'/admin/users');
    }

    /**
     * show the user
     *
     * @param $slug
     * @return \Illuminate\View\View|Response
     */
    public function show($slug)
    {
        try {
            $user = User::findBySlug($slug);

            $role = $this->userRepository->getRole($user);

            return view('admin.users.show', compact('user', 'role'));

        } catch (ModelNotFoundException $e) {

            return $this->redirectNotFound();

        }
    }

    /**
     * edit page for users
     *
     * @param $slug
     * @return \Illuminate\View\View|Response
     */
    public function edit($id)
    {
        try {
            $user = User::find($id);

            $roles = Role::all()->lists('name', 'id');

            $role = $this->userRepository->getRole($user);

            return view('admin.users.edit', compact('user', 'roles', 'role'));

        } catch (ModelNotFoundException $e) {

            return $this->redirectNotFound();

        }
    }

    /**
     * update users data
     *
     * @param UsersUpdateFormRequest $request
     * @param $id
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector|Response
     */
    public function update(UsersUpdateFormRequest $request, $id)
    {
        try {
            $data = ! $request->has('password') ? $request->except('password') : $request->all();

            $user = User::find($id);

            $user->update($data);

            $user->roles()->sync((array) \Input::get('role'));

            return redirect()->back();

        } catch (ModelNotFoundException $e) {

            return $this->redirectNotFound();

        }
    }

    /**
     *  delete user
     *
     * @param $id
     * @return \Illuminate\Http\RedirectResponse|Response
     */
    public function destroy($id)
    {
        try {
            $username = User::find($id)->name;

            if(''.\Auth::user()->id === $id) {

                Toastr::error('Can\'t be deleted!', $title = $username, $options = []);

                return redirect()->back();
            }
            else {
                Toastr::success('User deleted!', $title = $username, $options = []);

                $this->userRepository->delete($id);
            }
            return redirect()->back();

        } catch (ModelNotFoundException $e) {

            return $this->redirectNotFound();
        }
    }

    public function banORunBan($id) {
        try {
            $username = User::find($id)->name;

            if(''.\Auth::user()->id === $id) {

                Toastr::error('Can\'t be banned!', $title = $username, $options = []);

                return redirect()->back();
            }
            else {

                $this->userRepository->banORunBan($id);
            }
            return redirect()->back();

        } catch (ModelNotFoundException $e) {

            return $this->redirectNotFound();
        }
    }
}
