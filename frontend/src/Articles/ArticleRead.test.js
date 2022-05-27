import { render, screen } from '@testing-library/react';
import { ArticleRead } from './ArticleRead';

var mockUseParams = jest.fn()
var mockFetchArticle = jest.fn()
var mockNavigate = jest.fn()
var mockFetchComments = jest.fn()

jest.mock('./Comments/helpers', () => ({ fetchComments: (id) => mockFetchComments(id) }))


jest.mock('./helpers', () => ({ fetchArticle: (id) => mockFetchArticle(id)}))

jest.mock('../SharedHooks/customHooks', () => {
    const originalModule = jest.requireActual('../SharedHooks/customHooks');
    return {
        __esModule: true,
        ...originalModule,
        useUserData: () => ({id:555})
    };
});

jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        useParams: () => mockUseParams(),
        Link: () => null,
        useNavigate: () => mockNavigate
    };
});

describe('When rendering Article', () => {

    describe('Without content', () => {
        test('Renders an empty post', () => {
            mockFetchArticle.mockReturnValue(Promise.resolve())
            mockUseParams.mockReturnValue({id: "2"})
            mockFetchComments.mockReturnValue(Promise.resolve([{userName:"Test Name",userComment:"Test Comment."}]))
            render(<ArticleRead/>)
            expect(screen.getByTestId('empty-article')).toBeInTheDocument()
        })
    })

    describe('With Props', () => {
        test('Renders article with received details and being the original poster.', async () => {

            mockUseParams.mockReturnValue({id: "2"})
            mockFetchArticle.mockReturnValue(Promise.resolve({id:2,postName:"loremipsum",postContent:"loremipsumbody",userName:"JohnDoe", userid:555}))
            mockFetchComments.mockReturnValue(Promise.resolve([{userName:"Test Name",userComment:"Test Comment."}]))
            render(<ArticleRead/>)
            const component = await screen.findByTestId('rendered-article')
            expect(await screen.findByTestId('original-poster')).toBeInTheDocument()
            expect(component).toHaveTextContent("loremipsum")
            expect(component).toHaveTextContent("loremipsumbody")
            expect(component).toHaveTextContent("JohnDoe")
            expect(component).toHaveTextContent("JohnDoe")
            expect(mockFetchArticle).toHaveBeenCalledWith("2");
            expect(mockFetchArticle).toHaveBeenCalledTimes(1);
            
        })
        test('Renders article with received details but without being the original poster.', async () => {
            mockUseParams.mockReturnValue({id: "2"})
            mockFetchArticle.mockReturnValue(Promise.resolve({id:2,postName:"loremipsum",postContent:"loremipsumbody",userName:"JohnDoe",userid:404}))
            mockFetchComments.mockReturnValue(Promise.resolve([{userName:"Test Name",userComment:"Test Comment."}]))
            render(<ArticleRead/>)
            const component = await screen.findByTestId('rendered-article')
            expect(component).toHaveTextContent("loremipsum")
            expect(component).toHaveTextContent("loremipsumbody")
            expect(component).toHaveTextContent("JohnDoe")
            expect(mockFetchArticle).toHaveBeenCalledWith("2");
            expect(mockFetchArticle).toHaveBeenCalledTimes(1);
            
        })
    // //     test('Renders card without details button', () => {
    // //         render(<PictureCard {...basicProps}/>)
    // //         expect(screen.findByTestId('picture-card')).toBeInTheDocument()
    // //     })
    // // })
    
    // //     test('', () => {
    // //     })


    // //     test('', () => {
            
    })
})

